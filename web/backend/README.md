# API Documentation 
- API Secret: qrona_app

## how to hash
```javascript
params is a json object of all parameters passed except for the hash
str = secret + JSON.stringify(params) + secret
hash256(str)
```

## User 
```javascript
Post /api/user: {
    mail: string
    tel: string
    hash: string required!
}, { // resopnse
    _id: string
    mail: string
    tel: string
    code: string
}
// mail or tel, one is required

Get /api/user: {

}, { // unsecure is open!!!
    [
        users
    ]
}
```

## User contact Persons!!!!!

```javascript
Get /api/user/:code {

}, {
    _id: string
    mail: string
    tel: string
    code: string
    visits: [ // all the visits of the requested users
        {   
            _id: string
            poiId: string
            timestamp: string
            contacts: [ // all the persons who visited the same place at the same time frame (possible infections)
                {
                    _id: string
                    timestamp: string
                    person: [
                        mail: string
                        tel: string 
                        code: string
                }
            ]
        },
        ...
    ]
}
```

## POI
```javascript
Post /api/poi: {
    location: string required!
    mail_tel: string required!
    title: string required!
    category: string
}, {  // resopnse
    _id: string
    code: string
    location: string
    mailTel: string
    title: string 
    category: string
}
// mail or tel, one is required

Get /api/poi: {

}, {  <!-- resopnse -->
    [
        pois
    ]
}
```

## Views
```javascript
Post /api/view: {
    uid: string required!
    pid: string required!
    hash: string required!
}, { // resopnse 
    _id: string
    uid: string
    pid: string
    timestamp: string
}

Get /api/view: {
    
}, {
    [
        views
    ]
}
```
