import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl } from '@angular/forms';
import { Branch } from '../models/period';

export interface BranchSemOptions {
  branches: Branch[];
  semesters: string[];
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [],
})
export class AdminComponent implements OnInit {
  stream = this.firestore.collection<BranchSemOptions>('/branch-sem-options');
  branches: Branch[] = [];
  semesters: string[] = [];
  id: string = '';

  branchCode = new FormControl('');
  branchLabel = new FormControl('');
  semNo = new FormControl('');

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.stream.snapshotChanges().subscribe((val) => {
      if (!val.length) {
        this.stream
          .add({ branches: [], semesters: [] })
          .then((val) => console.log(val))
          .catch((err) => console.log(err));
        return;
      }
      this.branches = val[0].payload.doc.data().branches;
      this.semesters = val[0].payload.doc.data().semesters;
      this.id = val[0].payload.doc.id;
      // console.log(val[0].payload.doc.r);

      // console.log(val[0].payload.doc.data());
    });
  }

  addBranch() {
    const branch: Branch = {
      code: (this.branchCode.value as string).toUpperCase(),
      label: this.branchLabel.value,
    };
    this.stream.doc(this.id).update({ branches: [...this.branches, branch] });
  }

  addSemester() {
    this.semesters.push(this.semNo.value);
    this.stream.doc(this.id).update({ semesters: this.semesters });
  }
}
