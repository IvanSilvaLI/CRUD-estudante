import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { estudante } from './estudante';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
url = "http://localhost:3000/estudantes";
  constructor(private http: HttpClient){}

getEstudante(): Observable<estudante[]>{

  return this.http.get<estudante[]>(this.url);

}
save(estudante:estudante): Observable<estudante>{
  return this.http.post<estudante>(this.url, estudante);

}
delete(estudante: estudante): Observable<void>{
  return this.http.delete<void>(`${this.url}/${estudante.id}`);

}
update(estudante: estudante): Observable<estudante>{
  return this.http.put<estudante>(`${this.url}/${estudante.id}`, estudante);
}

}
