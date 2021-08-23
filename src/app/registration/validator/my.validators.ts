import {FormControl} from "@angular/forms";

export class MyValidators {

  static noTrimPass(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value.trim()) {
      return {"noPassTrim": true}
    }
    return null
  }

  static noRepeatSymbol(control: FormControl): { [key: string]: boolean } | null {
    return finderRepeat(control.value)

    function finderRepeat(control: string) {
      control.toLowerCase()
      for (let i = 0; i < control.length; i++) {
        if (control[i] === control[i - 1]) {
          return {"repeat": true}
        }
      }
      return null
    }
  }

  static finderLettersAndNumbers(control: FormControl): { [key: string]: boolean } | null {
    const arrNumbers = []
    const arrLetters = []

    finderAll(control.value)

    function finderAll(control: string) {
      for (let i = 0; i < control.length; i++) {
        if (+control[i]) {
          arrNumbers.push(control[i])
        } else {
          arrLetters.push(control[i])
        }
      }
    }

    if (arrLetters.length && arrNumbers.length) {
      return null
    }
    return {"noLettersOrNumbers": true}
  }

  static checkedBadSymbol(control: FormControl): { [key: string]: boolean } | null {
    const arrBadSymbols = [' ', '+', ')', '%', '/', '?', '<', '#', '>', '!', '@', ':', '^', '=', '"', '(', ';', '{', "'",
      '&', '№', '*', '~', '`', ',', '.', '+', '-', '_', '}', '[', ']'
    ]

    return checkedControl(control.value)

    function checkedControl(control: string) {
      for (let symbol of arrBadSymbols) {
        if (control.includes(symbol)) {
          return {"badSymbol": true}
        }
      }
      return null
    }
  }
}
