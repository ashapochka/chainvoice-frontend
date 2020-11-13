#!/usr/bin/env bash

az configure --defaults group=chainvoiceRG location=westeurope
az webapp config appsettings set \
  --name softserveinc-demo-chainvoice-ui \
  --settings BROWSER_BASE_URL=https://softserveinc-demo-chainvoice.azurewebsites.net/api
