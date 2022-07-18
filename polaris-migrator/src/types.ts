export type MigrationFn = ((
  fileContent: string,
) => string | null | undefined) & {
  extensions: string[];
};
