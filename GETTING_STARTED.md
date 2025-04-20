# Getting Started Guide

Follow these steps to set up and customize your professional developer portfolio website.

## Step 1: Setup

1. Make sure all files are in the correct directory structure:
   ```
   portfolio/
   ├── css/
   │   └── style.css
   ├── js/
   │   ├── main.js
   │   └── 3d-model.js
   ├── img/
   │   └── [project images]
   ├── models/
   │   └── [3D models]
   ├── index.html
   ├── README.md
   └── GETTING_STARTED.md
   ```

2. Open `index.html` in your browser to see the default portfolio

## Step 2: Customize Personal Information

Edit `index.html` to replace the default information with your details:

1. Change the `<title>` tag with your name
2. Update the logo text with your name
3. Edit the home section with your name and introduction
4. Update the About Me section with your bio, experience, and stats
5. Modify the Skills section to reflect your actual skill levels
6. Replace project information with your own projects
7. Update contact information with your email, phone, location, and social links

## Step 3: Add Your Images

1. Add your profile picture as `img/profile.jpg`
2. Add project images for each of your showcased projects
3. See `img/README.md` for detailed image requirements

## Step 4: Customize 3D Model (Optional)

1. Add your own 3D model as `models/laptop.glb` or customize the existing one
2. See `models/README.md` for more information on 3D models

## Step 5: Style Customization

Customize the look and feel by editing `css/style.css`:

1. Update the color scheme by changing CSS variables in the `:root` section:
   ```css
   :root {
       --primary-color: #4D61FC; /* Change to your preferred primary color */
       --secondary-color: #FE5E41; /* Change to your preferred accent color */
       /* ... other CSS variables ... */
   }
   ```

2. Adjust fonts, spacing, or any other styles to match your preferences

## Step 6: Add Custom Functionality (Advanced)

If you want to add new features or modify existing ones:

1. Edit `js/main.js` for general website functionality
2. Modify `js/3d-model.js` for 3D animation changes

## Step 7: Deployment

To make your portfolio live:

1. Upload all files to your web hosting service
2. Make sure to maintain the same directory structure
3. If you're using GitHub Pages:
   - Create a repository
   - Push the portfolio folder to the repository
   - Enable GitHub Pages in the repository settings

## Troubleshooting

- **3D Model Not Loading**: Check browser console for errors. You may need to run the site on a local server due to CORS restrictions.
- **Responsive Issues**: Test on multiple devices and adjust CSS as needed.
- **Images Not Loading**: Verify file paths and image formats.

## Need More Help?

Consult the `README.md` file for additional information about the portfolio features and structure. 