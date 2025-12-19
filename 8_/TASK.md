# Модифицирующие формы

## src/server.js

Реализуйте обработчики для маршрутов, которые необходимы для создания нового пользователя:

- GET _/users/new_ отображает страницу с формой, которую заполняет пользователь
- POST _/users_ обрабатывает данные формы

Данные пользователя представлены объектом:

```json
{
  id,
  username,
  email,
  password,
}
```

В целях безопасности мы должны хранить пароль пользователя в зашифрованном виде. Перед сохранением пароля зашифруйте его с помощью уже готовой функции `crypto()`. Для генерации `id` используйте готовую функцию `generateId()`.

Добавьте нормализацию имени пользователя и почтового адреса.

После создания пользователя должен происходить редирект на список пользователей.

## src/views/users/new.pug

Реализуйте шаблон для формы создания нового пользователя. Итоговая форма должна быть такой:

```html
<form action="/users" method="post">
  <div>
    <label>Имя:<input type="text" name="username" /></label>
  </div>
  <div>
    <label>Email:<input type="email" name="email" required="required" /></label>
  </div>
  <div>
    <label
      >Пароль:<input type="password" name="password" required="required"
    /></label>
  </div>
  <div>
    <label
      >Подтверждение пароля:<input
        type="password"
        name="passwordConfirm"
        required="required"
    /></label>
  </div>
  <input type="submit" value="Зарегистрировать" />
</form>
```
