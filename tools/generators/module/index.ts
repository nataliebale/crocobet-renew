import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names
} from '@nrwl/devkit';
import path = require('path');

import generateFacade from '../facade/index';
import { yesNo } from '../helpers/types';

interface NewModuleOptions {
  featureName: string;
  project: string;
  facade: yesNo;
  store: yesNo;
  path: string;
}

export default async function (tree: Tree, options: NewModuleOptions) {
  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    path.join(
      'apps',
      options.project,
      'src',
      'app',
      'features',
      options.path || '',
      names(options.featureName).fileName
    ), // destination path of the files
    {
      feature: names(options.featureName),
      normalizedName: names(options.featureName).fileName
    } // config object to replace variable in file templates
  );

  if (options.facade == 'yes') {
    await generateFacade(tree, {
      featureName: options.featureName,
      store: options.store,
      path: options.path
    });
  }

  await formatFiles(tree);
}
