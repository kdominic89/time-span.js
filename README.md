# TimeSpan

Functions such as setTimeout / setInterval and similar functions always expect the time in milliseconds
and to avoid having to convert 5 minutes into 5 \* 60 \* 1000 each time, this class was created.

## Example

```js
const TimeSpan = require('@kdominic/time-span');

console.log(TimeSpan.parse('42min'));               //  2520000 ms
console.log(TimeSpan.parse('1d 2h 3min 4s 5ms'));   // 93784005 ms
```

<br />

## Another example

Delete all files older than 7 days:

```js
const path      = require('node:path');
const fs        = require('node:fs');

const TimeSpan  = require('@kdominic/time-span');

const cleanPath = 'pathToClean';

if (fs.existsSync(cleanPath)) {
    fs.readdirSync(cleanPath).forEach((file) => {
        const filePath = path.join(cleanPath, file)
        const stat     = fs.statSync(filePath);
    
        if (stat.isFile()) {
            try {
                if (Date.now() > new TimeSpan(new Date(stat.ctime)).add('7d')) {
                    fs.rmSync(filePath);
                }
            }
            catch (_) {}
        } 
    });
}
```
