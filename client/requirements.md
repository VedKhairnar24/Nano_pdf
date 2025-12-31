## Packages
framer-motion | Smooth animations for file upload and status transitions
lucide-react | Beautiful icons for UI elements (already in base, but emphasizing usage)
clsx | Utility for conditional class names (usually with tailwind-merge)
tailwind-merge | Utility for merging tailwind classes

## Notes
File uploads use standard multipart/form-data via POST /api/unlock.
The backend returns a download URL which we present to the user.
No complex auth required for this specific tool.
