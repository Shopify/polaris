const { Toolkit } = require( 'actions-toolkit' );


Toolkit.run( async ( tools ) => {
  try {
    // Get the arguments
    const projectName = tools.arguments._[ 0 ];
    const columnName  = tools.arguments._[ 1 ];

    // Get the data from the event
    const pullrequest = tools.context.payload.pull_request;

    // Get the project name and number, column ID and name
    const { resource } = await tools.github.graphql(`query {
      resource( url: "${ pullrequest.html_url }" ) {
        ... on PullRequest {
          repository {
            projects( search: "${ projectName }", first: 10, states: [OPEN] ) {
              nodes {
                columns( first: 100 ) {
                  nodes {
                    id
                    name
                  }
                }
              }
            }
            owner {
              ... on Organization {
                projects( search: "${ projectName }", first: 10, states: [OPEN] ) {
                  nodes {
                    columns( first: 100 ) {
                      nodes {
                        id
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`);

    // Get an array of all matching projects
    const repoProjects = resource.repository.projects.nodes || [];
    const orgProjects = resource.repository.owner
      && resource.repository.owner.projects
      && resource.repository.owner.projects.nodes
      || [];
    
    // Get the columns with matching names
    const columns = [ ...repoProjects, ...orgProjects ]
      .flatMap( projects => {
        return projects.columns.nodes
          ? projects.columns.nodes.filter( column => column.name === columnName )
          : [];
      });

    // Check we have a valid column ID
    if( !columns.length ) {
      tools.exit.failure( `Could not find "${ projectName }" with "${ columnName }" column` );
    }

    
    // Add the cards to the columns
    const createCards = columns.map( column => {
      return new Promise( async( resolve, reject ) => {
        try {
          await tools.github.graphql(`mutation {
            addProjectCard( input: { contentId: "${ pullrequest.node_id }", projectColumnId: "${ column.id }" }) {
              clientMutationId
            }
          }`);

          resolve();
        }
        catch( error ){
          reject( error );
        }
      })
    })

    // Wait for completion
    await Promise.all( createCards ).catch( error => tools.exit.failure( error ) );

    // Log success message
    tools.log.success(
      `Added pull request ${ pullrequest.title } to ${ projectName } in ${ columnName }.`
    );
  }
  catch( error ){
    tools.exit.failure( error );
  }
}, {
  event: [ 'pull_request.opened' ],
  secrets: [ 'GITHUB_TOKEN' ],
})
