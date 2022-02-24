#!/bin/bash

mongo <<EOF
   var cfg = {
        "_id": "rs-email",
        "version": 1,
        "members": [
            {
                "_id": 0,
                "host": "99.99.9.23:27017",
                "priority": 2
            }
        ]
    };
    rs.initiate(cfg, { force: true });
    //rs.reconfig(cfg, { force: true });
    rs.status();
EOF
sleep 10

mongo <<EOF
   use admin;
   admin = db.getSiblingDB("admin");
   admin.createUser(
     {
	      user: "root",
        pwd: "password",
        roles: [ { role: "root", db: "admin" } ]
     });
     db.getSiblingDB("admin").auth("root", "password");
     rs.status();
EOF
