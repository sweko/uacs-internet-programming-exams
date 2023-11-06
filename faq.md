## The typescript compiler does not work, and complains about policy

The typescript compiler (`tsc`) is implemented via a poweshell script, so technically, when we are invoking it, we are running the powershell script `tsc.ps1`. By default that is not allowed, because running third-party scripts can have serious security implications. In this case we need to explicitly allow the script to run, by changing our execution policy. We can do that by executing

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

on the powershell command line.
