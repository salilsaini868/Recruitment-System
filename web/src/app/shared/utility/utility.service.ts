import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

    fillArray(n: number): any[] {
        return Array(n).fill(0).map((x, i) => i);
    }
}
