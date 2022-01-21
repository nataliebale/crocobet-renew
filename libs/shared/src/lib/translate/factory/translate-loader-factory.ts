import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { EnvironmentService } from '../../environment';

export const translateLoaderFactory = (
  http: HttpClient,
  env: EnvironmentService
): TranslateHttpLoader => {
  return new TranslateHttpLoader(
    http,
    `${env.config.apiUrl}/static/lang2/`,
    '.json'
  );
};
