import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from './environment.config';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  constructor(@Inject(ENV_CONFIG) public readonly config: EnvironmentConfig) {}
}
