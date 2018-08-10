### osx-winid
- Get's window ID for OSX

```
brew install smokris/getwindowid/getwindowid
```

#### Usage

```
import { getId, getList } from '@fallen90/osx-winid';

(async () => {
	const id = await getId('Google Chrome'); //e.g 8333

	//do something with id;


	const windows = await getList('Google Chrome');

	//do something with windows
});

```

#### Window list
```
[ { title: '', size: { width: 58, height: 19 }, id: '8306' },
  { title: 'Facebook - Log In',
    size: { width: 1280, height: 737 },
    id: '8303' },
  { title: '', size: { width: 427, height: 18 }, id: '8302' } ]
```

#### API

- `getId` - Get ID, returns promise
- `getList` - Get Window list for app, returns promise