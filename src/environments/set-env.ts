const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
  SUPABASE_URL: '${(process.env as any).SUPABASE_URL}',
  SUPABASE_ANON_KEY: '${(process.env as any).SUPABASE_ANON_KEY}',
  production: true,
};
`;
  console.log(
    'The file `environment.ts` will be written with the following content:',
  );
  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPath} \n`,
      );
    }
  });
};

setEnv();
