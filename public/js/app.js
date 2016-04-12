files=['controllers/', 'directives/']

for(var i=0;i<files.length;i++)
{
    //var imported = document.createElement('script');
    //imported.src = '/path/to/imported/script';
    //document.head.appendChild(imported);
    console.log(files[i]);
}


console.log("hi");
angular.module("Main", [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/')


//directives
/*
username -> min, max
password


*/

