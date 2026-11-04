# Shortcuty Import Helper

A helper for importing, managing, and organizing a large collection of liked shortcuts from [Shortcuty](https://browse.shortcuty.app/), into the Shortcuts app.   
This uses a markdown export of your liked shortcuts for easy previewing and editing before importing. Includes various ways to customize the process you want to take.

This project only uses native Shortcuts actions, no external app actions needed!  
Should be compatible with iOS 18+, though so far only tested on iOS 26.

**This is for the most part useful for:**  
- If you have a lot of liked shortcuts from Shortcuty, but not yet installed to Shortcuts *(already-installed detection is built-in as well.)*  
- Organize a large collection into folders easier via starting with a simple markdown to edit & import accordingly  
- Giving your collection to a friend or another device  

The Shortcuts app will very likely never support an action for the 'Add Shortcut' button. 
This shortcut automates everything beside that one inevitable manual button press, while adding as much convenience to everything else. 

You will need to use a desktop browser to export your liked shortcuts inventory.

> **Dev note:**   
> Shortcuty apparently offers an action for fetching liked shortcuts, but it was no where to be found on my device. I would of much preferred to utilize that over a console javascript to export, but it ended up having it's own convenient perks anyway.   

## Previews

<table>
  <tr>
    <th align="center">Main Menu</th>
    <th align="center">Config Menu</th>
    <th align="center">Next Installation Screen<br><em>(Guided Mode)</em></th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img width="310" alt="Main Menu" src="https://github.com/user-attachments/assets/4f42812a-6cc7-42f0-9d9f-00cf910a590b" />
    </td>
    <td align="center" valign="top">
      <img width="310" alt="Config Menu" src="https://github.com/user-attachments/assets/b64f830a-a1e7-4a2c-afce-6a84b3cfba66" />
    </td>
    <td align="center" valign="top">
      <img width="310" alt="Next Installation Screen (Guided Mode)" src="https://github.com/user-attachments/assets/7dd0cdbe-a0d0-4238-8a98-b357d7f1f1db" />
    </td>
  </tr>
</table>

### Demo Video

https://github.com/user-attachments/assets/a60a8270-312f-4c03-8620-24ac2122b05a

## Full Guide & Info

### 1. Install the shortcuts

Download and add both shortcuts to your Apple Shortcuts library:
- [Shortcuty Import Helper](https://www.icloud.com/shortcuts/04609dffc29846d9bfe58621e7a12611) — The main importer
- [Shortcuty Import Helper Config](https://www.icloud.com/shortcuts/dffc035d54344578a1f209927201ab7b) — Manages your settings and saved data

You only really need to install and run the main shortcut, it will have you install the config if you don't have it.

### 2. Export your liked shortcuts

On a desktop computer:

1. Sign in to [Shortcuty](https://browse.shortcuty.app/) and open your liked shortcuts page.
2. Open your browser's Developer Tools (`ctrl + shift + I`) and switch to the Console tab.
3. Open [liked-shortcuts-extractor.js](liked-shortcuts-extractor.js), use `ctrl + A` and copy the full script. 
4. Paste the script into the console tab of dev tools and run it. 
   - Type and run "allow pasting" if console prevents you at first. 
   - **Understand that running scripts in console is never recommended if you haven't reviewed, created, or trust them!!** Malicious scripts ran in console can steal your data.   
     If you want peace of mind, run the `liked-shortcuts-extractor.js` file through [VirusTotal](https://www.virustotal.com/gui/home/upload) and/or let AI scan it and tell you it's verdict. This is a safe script which only extracts your shortcuts you've liked on Shortcuty and inserts them in the markdown it creates and downloads for you. 
5. Once finished, your browser will download `Shortcuty Liked Shortcuts.md`.

### 3. (Optional) Organize or edit your markdown inventory

If you want the shortcuts you import to be organized into folders later, or exclude any from importing, then you should edit the markdown file accordingly first. You can do it yourself, or hand the markdown file to AI to organize how you want it. This section is for info on how it should be done. 

To preview or edit the markdown, open your `.md` file in a markdown editor such as [Hackmd](https://hackmd.io) if you want to preview/edit in browser, or [Obsidian](https://obsidian.md/) for local program on your computer and/or phone.

#### If you want to organize your imports into folders:

The helper doesn't create folders or move them into folders for you. The idea is to treat the `##` headers/sections as the folders you want and what shortcuts should belong to them.   
Later, after you finish adding imports for a section, you would select and add them to a corresponding folder you'd make for that section of shortcuts you just imported. Then move on to the next section of imports and repeat. 

Organize or rename the sections however you want, as long as they stay as `##` headers.  
Keep the shortcut entries, `##` sections, and the `Install:` URLs intact, the helper expects them in the way they were created by the `liked-shortcuts-extractor.js`.  
For reference, you can see [Expected Markdown Layout](dev/expected-markdown-layout.md).

#### If you want to exclude shortcuts from being imported:

Simply uncheck any shortcuts you don't want the helper to process.  
The markdown is originally created with each shortcut checked:  

- `- [x]` — Include for importing
- `- [ ]` — Exclude from importing

### 4. Move the markdown file to your Apple device

Save the ready `.md` file somewhere in the Files app on your device.  

### 5. Let the helper learn & remember your inventory

Run the main shortcut > choose 'Scan/rescan a markdown file' > select the `.md` from Files.  

Once it's initially scanned your inventory, whenever you select 'Use current scanned markdown file' it will use the cached state of your markdown, thus making it load faster going forward.  
Rescan if you've made changes to your markdown inventory or want to use a new one.  

### 6. Start importing

After the initial scan, you can choose what to import by:  

- **Individual section:**  
  Import shortcuts from one section of your inventory at a time.  
  *(Recommended if you're planning to organize into folders after each section import)*  
- **All sections:**  
  Process all shortcuts across all sections, in order  
- **Custom:**  
  Select specific shortcuts from one or more sections  

You'll get a session overview before importing begins.  
If you end a session early or accidentally do, you can use 'Resume last session' the next time you run the helper.

## More Info

### Import Modes

#### Guided Mode (Default/Recommended):
- The helper asks before opening each next installation link  
- It will break for the set wait time *(default 6 seconds)* before the next import popup is displayed, giving you time to tap 'Add shortcut'  
- Before each import you can skip, request more time, or end/pause the session to optionally resume it later  

#### Automatic Mode: 
- Auto opens the next installation link everytime the set wait time is reached *(default 8 seconds)*  
- It will just continuously open a shortcut link periodically until each in the line up is met, or you end/pause the shortcut  
- You can set a limit with the config shortcut to end the run when a number of imports is reached, and resume the rest after  
- This mode is less recommended as there won't be any options provided before each import  
- Don't use this mode if you think you may want to manually skip shortcuts  

### Installed History/Already-Installed Detection
- An installation history builds as you import shortcuts. It is stored separately from the scanned catalog, so rescanning or replacing your markdown file won't erase that history.  
- By default, any shortcuts detected or recorded as installed will be skipped.  
- Installed history & already installed detection runs on two mechanisms:  
  1. When you use 'Open installation' on a shortcut the helper will assume and record it as installed, even if you don't ultimately end up adding the shortcut after.  
  2. Exact-name matching of shortcuts present in your library.  
  - Both are on by default, use the config shortcut if you want it different.  

### Change Preferences

There are various options to customize the helper using it's config shortcut.   
You can adjust import modes, delays, installed-shortcut detection, manage your saved catalog, and some more.

## For developers

The shortcuts were developed using [Cherri Playground](https://github.com/electrikmilk/cherri). The [`dev/`](dev/) directory contains their Cherri build scripts. 
