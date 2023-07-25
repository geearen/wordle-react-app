## DEFINITELY NOT WORDLE

A reverse engineer of a popular game wordle. This project was created to practice technologies listed below:

- React
- TypeScript
- Tailwind
- Redux
- Testing Library
- Jest
- Cypress Testing

In addition, this project also uses a wordle-api that I have created.

https://github.com/geearen/wordle-api

It's simple api that returns the word of the day and a POST JSON response (sample json below). The response is used to display which letters is in correct position.

```json
{
    "green": [],
    "yellow": [
        "S",
        "E",
        "E"
    ],
    "gray": [
        "W",
        "T"
    ],
    "positionChecked": [
        "present",
        "absent",
        "present",
        "present",
        "absent"
    ],
    "wordExist": true
}

{
    "green": [
        "A",
        "S",
        "S",
        "E"
    ],
    "yellow": [
        "S"
    ],
    "gray": [],
    "positionChecked": [
        "present",
        "correct",
        "correct",
        "correct",
        "correct"
    ],
    "wordExist": true
}
```
