# TDL WinterSchool Final practical task
This project is created for testing the website: http://www.automationpractice.pl/

## How to install
Run command:
```
npm install
```
## How to run the tests
Run command:
```
npm run wdio
```
### Run tests with a specific tag
To run the test suits based on some specific tag "@tag" run command:
```
npm run wdio -- --cucumberOpts.tagExpression "@tag"
```
The short one version of the comand:
```
npm run tag -- "@my-tag"
```
## How to view report
First run the tests and then run command:
```
npm run allure
```


