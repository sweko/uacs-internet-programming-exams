## The typescript compiler does not work, and complains about policy

The typescript compiler (`tsc`) is implemented via a poweshell script, so technically, when we are invoking it, we are running the powershell script `tsc.ps1`. By default, that is not allowed, because running third-party scripts can have serious security implications. In this case we need to explicitly allow the script to run, by changing our execution policy. We can do that by executing

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

on the powershell command line.

## When I run `git` I get an error saying that the command is not recognized

This means that git is not installed globally on your computer. However, the computer has git installed, and it can be accessed via the `Git Bash` application. You can find it in the start menu. You can use it to run git commands. Alternatively, you can use the `Git CMD` application, which is also installed on the computer. You can find it in the start menu as well. It is a command line application, so you can use it to run git commands as well. Note that you will need to use the `cd` command to navigate to the correct folder. You can use the `dir` command (Git CMD) or the `ls` command (Git Bash) to list the contents of the current folder, and the `cd <folder-name>` command to navigate to a folder.

## When I run `git push` I get a window asking for my username and password

This is because you are using HTTPS to connect to GitHub. GitHub discontinued support for password authentication for HTTPS in August 2021. You can read more about it [here](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/). In order to fix this, instead of using the password, the user will need to use a personal access token. You can read more about personal access tokens [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token). You can create a personal access token by following the steps in the link. Make sure to add the `Contents` repository permission when creating the token. Once you have created the token, you can use it instead of your password when pushing to GitHub.

## When I run `git push` I get an error mentioning a "403" or "403 Forbidden"

1. In this case, the cause usually is that another user is already logged in to github on your computer. You can fix this by logging out of github on your computer. The easiest way is to start the Credentials Manager tool provided by Windows. Under the section "Windows Credentials" you should see an entry for github. Click on it and then click on "Remove". This will remove the credentials for github from your computer. You can now try to push again. You will be asked to log in using your browser. Make sure to use your own github account.

2. Another potential clause is that the user cloned the wrong repository, i.e instead of cloning the forked repository, they cloned the original repository. In this case, it will be necessary to change the remote URL of the repository. This can be verified by running the following command: `git remote -v`. If it prints ` https://github.com/sweko/uacs-internet-programming-exams.git` then the user cloned the original repository. In this case, the user will need to change the remote URL of the repository.  
This can be done by running the following command: `git remote set-url origin <url-of-the-forked-repository>`. You can find the URL of the forked repository by going to the forked repository page on github and clicking on the "Code" button in the top right corner of the page. Then copy the URL and use it in the command above. You can verify that the URL was changed by running the following command: `git remote -v`. It should print the URL of the forked repository.