import { Directive, HostListener, HostBinding } from "@angular/core";


@Directive({
    selector: 'phoneHyphen'
})
export class HyphenDirective {
    @HostListener('keydown', ['$event']) Test(){
        console.log("here");
    }
    // @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    //     console.log("Here");
    //     const input = event.target as HTMLInputElement;
    //     let inputCleaned = input.value.replace(/\s+/g, '');
    //     if (inputCleaned.length > 12) {
    //         inputCleaned = inputCleaned.substr(0, 14);
    //     }

    //     inputCleaned = inputCleaned.replace(/[-()]/g,'');

    //     let output = [];
    //     output.push("(" + inputCleaned.substr(0,3) + ")");
    //     if (inputCleaned.substr(3,6) !== "") {
    //         output.push(inputCleaned.substr(3,6));
    //     }
    //     if (inputCleaned.substr(6,10) !== "") {
    //         output.push(inputCleaned.substr(6,10));
    //     }
    //     console.log("Here");
    //     input.value = output.join('-');
    // }
}