# pagination

- Clone it to a local directory 
```git clone https://github.com/shuigudian/pagination```

- Change dir into the cloned dir and install dependencies
```npm install```

- Run it by
```DEBUG=app:* npm start```

In a browser, it accepts URL like: http://127.0.0.1:3000/sort?id=asc&first_name=asc&last_name=asc&page=4&size=10
where size=10 means each page has 10 records, page=4 means displaying page 4, id=asc means sorting by id in asscend order, etc.
