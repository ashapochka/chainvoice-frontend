#!/usr/bin/env bash

az configure --defaults group=chainvoiceRG location=westeurope
#az appservice plan create --name chainvoice-ui-plan --sku B1
az webapp create --name softserveinc-demo-chainvoice-ui --plan chainvoice-plan --runtime "NODE|10.16"
