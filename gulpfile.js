//Підключаємо gulp
var gulp = require ("gulp");
//Створюємо тестовий таск
gulp.task ('testTask', function () {
 console.log ('This is a test task!');
});
//Запуск тасків за замовчуванням
gulp.task ("default", ["testTask"]);