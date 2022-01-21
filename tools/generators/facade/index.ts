import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names
} from '@nrwl/devkit';
import path = require('path');

import { appendTextToFile } from '../helpers/functions';
import { yesNo } from '../helpers/types';

interface NewFacadeOptions {
  featureName: string;
  store: yesNo;
  path: string;
}

export default async function (tree: Tree, options: NewFacadeOptions) {
  const featureNames = names(options.featureName);

  const pathToCreate = path.join(
    'libs',
    'facade',
    'src',
    'lib',
    'features',
    options.path || '',
    names(options.featureName).fileName
  )

  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files/__files'), // path to the file templates
    pathToCreate, // destination path of the files
    {
      feature: featureNames,
      normalizedName: featureNames.fileName,
      store: options.store == 'yes'
    } // config object to replace variable in file templates
  );

  if (options.store == 'yes') {
    generateFiles(
      tree, // the virtual file system
      joinPathFragments(__dirname, './files/__store'), // path to the file templates
      pathToCreate, // destination path of the files
      {
        feature: featureNames,
        normalizedName: featureNames.fileName
      } // config object to replace variable in file templates
    );
  }

  appendTextToFile(
    path.join('libs', 'facade', 'src', 'index.ts'),
    `export * from './lib/features/${featureNames.fileName}/${featureNames.fileName}-facade.module';
         export * from './lib/features/${featureNames.fileName}/facade/${featureNames.fileName}.facade';`
  );

  await formatFiles(tree);
}
