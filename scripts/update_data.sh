#!/bin/bash

ROOTDIR="$( dirname "$( dirname "$( realpath "$0" )" )" )"
echo "$ROOTDIR"

# Get the data
curl -o "$ROOTDIR/public/data/odin.json" "https://hr6vfhdasc.execute-api.us-east-2.amazonaws.com/mainnet/api/product?agent_addr&planet_id=0x000000000000"
curl -o "$ROOTDIR/public/data/heimdall.json" "https://hr6vfhdasc.execute-api.us-east-2.amazonaws.com/mainnet/api/product?agent_addr&planet_id=0x000000000001"
