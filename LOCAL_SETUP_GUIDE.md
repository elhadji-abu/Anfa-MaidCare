# MaidCare Pro - Local Setup Guide

This guide will help you run your MaidCare Pro website on your own computer, even if you're not technical.

## What You Need First

1. **A Computer** - Windows, Mac, or Linux
2. **Internet Connection** - To download the required software
3. **The Project ZIP File** - That you downloaded from Replit

## Step 1: Install Node.js (JavaScript Runtime)

Node.js is like the engine that runs your website.

### For Windows:
1. Go to https://nodejs.org
2. Click the big green button that says "Download Node.js (LTS)"
3. Run the downloaded file (.msi)
4. Click "Next" through all the steps
5. Restart your computer

### For Mac:
1. Go to https://nodejs.org
2. Click the big green button that says "Download Node.js (LTS)"
3. Run the downloaded file (.pkg)
4. Click "Continue" through all the steps
5. Restart your computer

### For Linux (Ubuntu/Debian):
1. Open Terminal
2. Type: `sudo apt update`
3. Type: `sudo apt install nodejs npm`

## Step 2: Extract Your Project

1. Find the `maidcare-pro-project.zip` file you downloaded
2. Right-click on it and select "Extract All" (Windows) or double-click (Mac)
3. Choose a location like your Desktop or Documents folder
4. Remember where you put it!

## Step 3: Open Command Line

### Windows:
1. Press `Windows Key + R`
2. Type `cmd` and press Enter
3. A black window will open

### Mac:
1. Press `Cmd + Space`
2. Type `Terminal`
3. Press Enter

### Linux:
1. Press `Ctrl + Alt + T`

## Step 4: Navigate to Your Project

In the command line window, you need to go to your project folder.

1. Type `cd ` (with a space after cd)
2. Drag and drop your extracted project folder into the command line window
3. Press Enter

Your command line should now show the path to your project.

## Step 5: Install Project Dependencies

This downloads all the code libraries your website needs.

1. In the command line, type: `npm install`
2. Press Enter
3. Wait for it to finish (this might take 2-5 minutes)
4. You'll see lots of text scrolling - this is normal!

## Step 6: Set Up the Database (Optional)

Your website can run without a real database - it will use temporary storage that gets reset when you restart.

**For basic testing, you can skip this step.**

If you want permanent data storage, you'll need to:
1. Install PostgreSQL from https://www.postgresql.org/download/
2. Create a database
3. Set up the DATABASE_URL (this is more technical)

## Step 7: Start Your Website

1. In the command line, type: `npm run dev`
2. Press Enter
3. Wait for messages like "server running on port 5000"
4. Your website is now running!

## Step 8: View Your Website

1. Open your web browser (Chrome, Firefox, Safari, etc.)
2. Go to: `http://localhost:5000`
3. You should see your MaidCare Pro website!

## Step 9: Using Your Website

- **Public Website**: Browse services, submit booking requests
- **Admin Access**: Click "Admin Login" and use:
  - Username: `admin`
  - Password: `admin123`

## Step 10: Stopping Your Website

When you're done:
1. Go back to the command line window
2. Press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)
3. Your website will stop running

## Common Issues and Solutions

### "Node.js is not recognized"
- You need to install Node.js (Step 1)
- Restart your computer after installing

### "npm install" fails
- Make sure you're in the right folder (Step 4)
- Try running as administrator (Windows) or with `sudo` (Mac/Linux)

### Website doesn't load
- Make sure you typed `http://localhost:5000` correctly
- Check that the command line shows "server running"
- Try `http://127.0.0.1:5000` instead

### Port already in use
- Something else is using port 5000
- Close other programs or restart your computer

## Next Steps

Once your website is running:
- Test all the features (booking, admin panel, etc.)
- Customize the content and styling
- Set up a real database for permanent storage
- Deploy to a web hosting service

## Getting Help

If you run into problems:
1. Check the command line for error messages
2. Try restarting your computer
3. Make sure all steps were followed exactly
4. Search online for the specific error message

## File Structure

Your project contains:
- `client/` - The website frontend (what users see)
- `server/` - The backend (handles data and requests)
- `package.json` - Lists all the required libraries
- `README.md` - Technical documentation

You can modify files in the `client/src/` folder to customize your website.

---

**Congratulations!** You now have your own maid service website running locally on your computer.