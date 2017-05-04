import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Library} from '../../model/library';
import {SERVER} from '../../server';
import {ErrorHolder} from '../../shared/error-holder';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LibrariesService {
  constructor(private http: Http) {
  }

  getLibraries(): Observable<Library[]> {
    return this.http.get(SERVER + '/library')
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  createLibrary(library: Library): Observable<Library> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this.http.post(SERVER + '/library', JSON.stringify(library), options)
      .map((res: Response) =>  res.json());
  }

  private handleError (error: Response) {
    const status = error.status;
    const message = error.statusText;

    return Observable.throw(new ErrorHolder({status: status, message: message}));
  }
}
