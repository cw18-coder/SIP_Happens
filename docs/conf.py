# Sphinx configuration for Read The Docs
import sys
import os

project = 'Mutual Fund Investing Workshop'
copyright = '2025'
author = 'Workshop Author'

extensions = [
    'myst_parser',  # For Markdown support
    'sphinx_rtd_theme',
]

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

master_doc = 'index'

exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

html_theme = 'sphinx_rtd_theme'

# Optional: logo and favicon (add your own if desired)
# html_logo = 'logo.png'
# html_favicon = 'favicon.ico'

# Enable markdown tables and other MyST features
myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "html_admonition",
    "html_image",
    "substitution",
    "tasklist",
]

# Add Font Awesome for icons in HTML output
html_static_path = ['_static']

def setup(app):
    app.add_css_file('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css')
