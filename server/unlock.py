import sys
import subprocess
import os

def unlock_pdf(input_path, output_path, password):
    """
    Unlocks a PDF using qpdf.
    We use qpdf because it is installed in the system environment and is highly reliable
    for decryption tasks.
    """
    try:
        # Construct qpdf command
        # qpdf --password=PASSWORD --decrypt input.pdf output.pdf
        cmd = [
            "qpdf",
            f"--password={password}",
            "--decrypt",
            input_path,
            output_path
        ]
        
        # Run qpdf
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            # Propagate error to caller (Node.js will catch this)
            print(result.stderr, file=sys.stderr)
            sys.exit(result.returncode)
            
        print(f"Successfully unlocked: {output_path}")
        
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 unlock.py <input> <output> <password>", file=sys.stderr)
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    pwd = sys.argv[3]
    
    unlock_pdf(input_file, output_file, pwd)
