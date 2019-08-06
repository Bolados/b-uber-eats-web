import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

    bigMenu: boolean;

    @Input() open = false;

    @Input() placeholder = 'Search';

    isFocused = false;

    searchForm: FormGroup = this.buildForm('');

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    buildForm(value: string): FormGroup {
        return this.formBuilder.group({
            value: new FormControl(value)
        });
    }

    public onSubmit(search) {
        if (search.value) {
            console.log('search : ', search.value);
        }
    }

    ngOnInit() {
    }

    search() {

    }

    onFocus() {
        this.bigMenu = true;
        this.isFocused = true;
    }

    onFocusOut() {
        this.bigMenu = false;
        this.isFocused = false;
    }

}
