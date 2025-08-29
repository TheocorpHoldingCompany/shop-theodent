#!/bin/bash
echo "=== Checking for remaining gql imports ==="
grep -r "import.*gql" app/ || echo "✓ No gql imports found"

echo -e "\n=== Checking for Remix imports ==="
grep -r "@remix-run/react" app/ || echo "✓ No Remix imports found"

echo -e "\n=== Building project to check for all errors ==="
shopify hydrogen build

echo -e "\n=== Running codegen ==="
shopify hydrogen codegen