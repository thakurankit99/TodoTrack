Masking your Plik instance as a **To-Do List** app is an *excellent stealth idea* — to-do apps are common, simple, and rarely raise red flags.

Here's how to convincingly pull it off:

---

## ✅ To-Do List Disguise Plan for Plik

### 🔧 1. **Frontend UI Changes**

* Rename the app to something like:

  * `QuickTasks`
  * `WorkBoard`
  * `FocusList`
* Modify labels:

  * “Upload File” → “Attach Task File”
  * “Download” → “Open Attachment”
  * “Drag & Drop” → “Drag tasks or documents”
* Change main heading:
  `“Upload files”` → `“Add a new task or attach a file”`

---

### 🎨 2. **UI Elements to Add for Realism**

* Fake To-Do list panel (static, non-functional is fine):

  ```html
  - [ ] Prepare meeting slides  
  - [x] Review documentation  
  - [ ] Submit client brief  
  ```
* Date selector or deadline field
* Dropdown for "Project" or "Department"
* Fake buttons: "Mark as Done", "Assign"

---

### 🌐 3. **Landing Page Flow**

* `/` → Fake To-Do Dashboard
* `/submit` → Plik's upload interface (renamed to "Add Task with File")
* Use JavaScript to hide/show sections for illusion of interaction

---

### 🧠 4. **Text + Visual Tweaks**

* Favicon: checklist icon (✅📝)
* Page title: `QuickTasks | Team Dashboard`
* Description: `“Internal task board for submitting and reviewing work-related notes and documents.”`

---

### 🔐 5. **Security Add-ons (Optional)**

* Add a PIN-protected fake login
* Serve behind Nginx reverse proxy with HTTP Basic Auth

---