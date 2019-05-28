// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// /*
//   Generated class for the TodosProvider provider.

//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
// @Injectable()
// export class TodosProvider {

//   constructor(public http: HttpClient) {
//     console.log('Hello TodosProvider Provider');
//   }

// }


import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class Todos {

  data: any;
  db: any;
  dba: any;
  remote: any;
  remotea: any;

  constructor() {

    this.db = new PouchDB('cloudo');
    this.dba = new PouchDB('cloudo');

    this.remote = new PouchDB('http://admin:admin@localhost:5984/cloudo/');
    this.remotea = new PouchDB('http://admin:admin@localhost:5984/cloud/');

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    // this.db.sync(this.remote, options);

    var sync = PouchDB.sync('cloudo', 'http://admin:admin@localhost:5984/cloudo/', {
      live: true,
      retry: true
    }).on('change', this.handleChange)

    var synca = PouchDB.sync('cloud', 'http://admin:admin@localhost:5984/cloud/', {
      live: true,
      retry: true
    }).on('change', this.handleChange)
  }

  getTodos() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

    });

  }

  createTodo(todo){
    this.db.post(todo);
  }

  updateTodo(todo){
    this.dba.put(todo).catch((err) => {
      console.log(err);
    });
  }

  deleteTodo(todo){
    this.db.remove(todo).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change){

    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data.push(change.doc);
      }

    }

  }

}
