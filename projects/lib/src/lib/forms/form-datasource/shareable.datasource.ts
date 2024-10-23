import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { PartialDatasource } from "./partial.datasource";
import { Observable, ReplaySubject } from "rxjs";

export class ShareableDataSource<T> implements DataSource<T> {    

    private data$: ReplaySubject<T[]> = new ReplaySubject();
    private isConnected = false;

    constructor(private src: PartialDatasource<T>) {

    }

    connect(collectionViewer: CollectionViewer): Observable<readonly T[]> {

        if(!this.isConnected) {
            this.src.connect(null as any).subscribe(elts => this.data$.next(elts));
            this.isConnected = true;
        }

        return this.data$;
    }
        
    disconnect(collectionViewer: CollectionViewer): void {

        if(this.isConnected) {
            this.src.disconnect(null as any);
            this.isConnected = false;
        }

    }

    getDatasource() {
        return this.src;
    }
}