import {NgModule} from '@angular/core';

import {ExampleService} from './example.service';
import { ApiClientService } from './swagger-generated/apiClientService';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ExampleService, ApiClientService
  ],
})
export class ServiceModule {
}
