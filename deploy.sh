#!/bin/sh
HOST='ftp.kodhus.com'
CSS='kodhus.min.css'
JS='kodhus.min.js'
LOCALPATH='dist'
REMOTEPATH='/kodhus-ui'

ftp -n $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
lcd $LOCALPATH
cd $REMOTEPATH
prompt
mput *
quit
END_SCRIPT
exit 0