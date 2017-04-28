# Актуальная сборка проекта: http://52.41.27.255/

# Web CIS Development
- Регистрируемся в GitHub
- Пишем имя аккаунта в чат разработки
- Устанавливаем бинарник гита отсюда: git-scm.com/downloads
- Советую для разработки использовать Sublime Text 3 в связке с GitSavvy

Для разработки используем PHP, поэтому скачиваем репозиторий в апач или любой другой сервер, который вы используете и настраиваете виртуальный хост

# GitSavvy
- Выполняем команду git clone (GitSavvy: Для этого CTRL+SHIFT+P - git clone)
Адрес репозитория: https://github.com/Falcon-RawByte/Web_CIS_Development
Для того, чтобы залить изменения:
- git quick stage - Зафиксировать изменения в проекте
- git quick commit - Сообщение, что изменили, добавили, убрали
- git push - Залить в репозиторий

# Без GitSavvy
- https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/
- git add .
- git commit -m "Сообщение"
- git push master

# База данных
База данных расположена на сервере по адресу: 66.198.240.24, скрипт подключения лежит в php/connect.php