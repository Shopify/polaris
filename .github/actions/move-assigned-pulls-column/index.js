const { Toolkit } = require( 'actions-toolkit' );


Toolkit.run( async ( tools ) => {
  try {
    // Get the arguments
    const projectName = tools.arguments._[ 0 ];
    const columnName  = tools.arguments._[ 1 ];

    // Get the data from the event
    const pullrequest = tools.context.payload.pull_request;

    // Check if there are existing asignees
    if( pullrequest.assignee && pullrequest.assignee.length ) {
      const assigneeLogins = pullrequest.assignee.map( data => data.login ).join( ', ' );
      tools.exit.neutral( `${ assigneeLogins } are already assigned. Leaving ${ pullrequest.title } in current column.` );
    }

    // Fetch the column ids and names
    const { resource } = await tools.github.graphql(`query {
      resource( url: "${ pullrequest.html_url }" ) {
        ... on PullRequest {
          projectCards {
            nodes {
              id
              column {
                name
              }
            }
          }
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

    // Get the card id and the column name
    const cardId = resource.projectCards.nodes 
      && resource.projectCards.nodes[ 0 ]
      && resource.projectCards.nodes[ 0 ].id
      || null;

    const currentColumn = resource.projectCards.nodes
      && resource.projectCards.nodes[ 0 ]
      && resource.projectCards.nodes[ 0 ].column.name
      || null;

    if( cardId === null || currentColumn === null ){
      tools.exit.failure( `The pull request ${ pullrequest.title } is not in a project.` );
    }

    if( currentColumn === columnName ){
      tools.exit.neutral( `The pull request ${ pullrequest.title } is already in ${ columnName }.` );
    }

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

    // Move the cards to the columns
    const moveCards = columns.map( column => {
      return new Promise( async( resolve, reject ) => {
        try {
          await tools.github.graphql(`mutation {
            moveProjectCard( input: { cardId: "${ cardId }", columnId: "${ column.id }" }) {
              clientMutationId
            }
          }`);

          resolve();
        }
        catch( error ){
          reject( error );
        }
      })
    });

    // Wait for completion
    await Promise.all( moveCards ).catch( error => tools.exit.failure( error ) );

    // Log success message
    tools.log.success(
      `Moved newly assigned pull request ${ pullrequest.title } to ${ columnName }.`
    );
  }
  catch( error ){
    tools.exit.failure( error );
  }
}, {
  event: [ 'pull_request.assigned' ],
  secrets: [ 'GITHUB_TOKEN' ],
})
