#!/bin/bash

# Check npm publication status for nocss-framework

echo "════════════════════════════════════════════════════════════"
echo "  📦 nocss-framework - NPM Publication Status Check"
echo "════════════════════════════════════════════════════════════"
echo ""

# Check if logged in
echo "🔐 Checking npm login status..."
if npm whoami > /dev/null 2>&1; then
    USERNAME=$(npm whoami)
    echo "✅ Logged in as: $USERNAME"
else
    echo "❌ Not logged in to npm"
    echo ""
    echo "Run: npm login"
    exit 1
fi

echo ""

# Check if package exists
echo "📦 Checking if nocss-framework is published..."
if npm view nocss-framework version > /dev/null 2>&1; then
    VERSION=$(npm view nocss-framework version)
    echo "✅ Package published!"
    echo ""
    echo "════════════════════════════════════════════════════════════"
    echo "  Package Information"
    echo "════════════════════════════════════════════════════════════"
    npm view nocss-framework
    echo ""
    echo "════════════════════════════════════════════════════════════"
    echo "  CDN URLs (available in ~5 minutes)"
    echo "════════════════════════════════════════════════════════════"
    echo ""
    echo "jsDelivr:"
    echo "  https://cdn.jsdelivr.net/npm/nocss-framework@$VERSION/dist/nocss.min.css"
    echo ""
    echo "unpkg:"
    echo "  https://unpkg.com/nocss-framework@$VERSION/dist/nocss.min.css"
    echo ""
    echo "Latest (auto-update):"
    echo "  https://cdn.jsdelivr.net/npm/nocss-framework/dist/nocss.min.css"
    echo "  https://unpkg.com/nocss-framework/dist/nocss.min.css"
    echo ""
else
    echo "❌ Package not yet published"
    echo ""
    echo "To publish, run: npm publish"
fi

echo "════════════════════════════════════════════════════════════"
