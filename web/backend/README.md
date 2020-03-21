# API Documentation 
## API Secret: qrona_app

# how to hash
# params is a json object of all parameters passed except for the hash
# str = secret + JSON.stringify(params) + secret
# hash256(str)

## User 

Post /api/user: {
    mail: string
    tel: string
    hash: string required!
}, {
    _id: string
    mail: string
    tel: string
    code: string
}
<!-- mail or tel, one is required -->

Get /api/user: {
    hash: string
}, {
    [
        users
    ]
}


## POI

Post /api/poi: {
    location: string required!
    mail_tel: string required!
    title: string required!
    category: string
}, {
    _id: string
    code: string
    location: string
    mailTel: string
    title: string 
    category: string
}
<!-- mail or tel, one is required -->

Get /api/poi: {
    hash: string
}, {
    [
        pois
    ]
}


## Views

Post /api/view: {
    uid: string required!
    pid: string required!
    hash: string required!
}, {
    _id: string
    uid: string
    pid: string
    timestamp: string
}

Get /api/view: {
    hash: string
}, {
    [
        views
    ]
}