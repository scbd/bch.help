; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define InstallRoot "UNEP-GEF Training"
#define InstallClass "BCH Interactive Modules"
#define InstallLanguage "English"
#define MyAppName "Introduction to the Biosafety Clearing House"
#define MyAppVerName "Introduction to the Biosafety Clearing House"
#define MyAppPublisher "UNEP-GEF"
#define MyAppURL "moodle.unep.ch"
#define MyAppExeName "pilot_user1_2.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{DEBEB12C-B0E6-4021-B416-F05A948A70C4}
AppName={#MyAppName}
AppVerName={#MyAppVerName}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={pf}\{#InstallRoot}\{#MyAppName}
DefaultGroupName={#InstallRoot}\{#MyAppName}
OutputBaseFilename=IM02En
Compression=lzma
SolidCompression=true
OutputDir=E:\IMInstaller\Compiled
AlwaysUsePersonalGroup=true
WizardImageFile=C:\Documents and Settings\Usuario\My Documents\My Pictures\imagencostado.bmp
WizardSmallImageFile=C:\Documents and Settings\Usuario\My Documents\My Pictures\miniimagen.bmp
DisableDirPage=true
EnableDirDoesntExistWarning=true
DisableProgramGroupPage=true
LicenseFile=C:\Documents and Settings\Usuario\My Documents\Disclaimer.rtf
RestartIfNeededByRun=false

[Languages]
Name: english; MessagesFile: compiler:Default.isl

[Tasks]
Name: desktopicon; Description: {cm:CreateDesktopIcon}; GroupDescription: {cm:AdditionalIcons}; Languages: 

[Files]
Source: C:\Documents and Settings\Usuario\Desktop\IM02En_Introduction_to_the_Biosafety_Clearing_House\IM02En_Introduction_to_the_Biosafety_Clearing_House\*; DestDir: {app}; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files
Source: C:\Documents and Settings\Usuario\Desktop\install_flash_player_active_x.exe; DestDir: {app}

[Icons]
Name: {group}\{#MyAppName}; Filename: {app}\{#MyAppExeName}
Name: {group}\{cm:UninstallProgram,{#MyAppName}}; Filename: {uninstallexe}
Name: {commondesktop}\{#MyAppName}; Filename: {app}\{#MyAppExeName}; Tasks: desktopicon

[Run]
Filename: {app}\{#MyAppExeName}; Description: {cm:LaunchProgram,{#MyAppName}}; Flags: nowait postinstall skipifsilent
Filename: {app}\install_flash_player_active_x.exe; Tasks: ; Languages: ; Parameters: /s; StatusMsg: Installing Flash Player...