const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			api: "http://127.0.0.1:3001/api",
			token: "",
			currentUser: {},
			authenticated: false,
		},
		actions: {
			// ---------------- START USER ACTIONS -------------
			syncToken: async () => {
				const store = getStore();
				const actions = getActions();
				const token = sessionStorage.getItem("token");
				if (token == null) {
					return
				}
				const ops = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				}
				try {
					const response = await fetch(`${store.api}/verify-token-integrity`, ops);
					if (!response.ok) {
						actions.logOff();
					}
					const body = await response.json();
					setStore({ token: token });
					setStore({ currentUser: body });
					setStore({ authenticated: true })
					sessionStorage.setItem("authenticated", true);
				} catch (error) {
					console.log(error)
					actions.logOff();
				}
			},
			logIn: async (username, password) => {
				const store = getStore();
				const actions = getActions();
				const ops = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: username,
						password: password,
					}),
				};
				try {
					const response = await fetch(`${store.api}/login`, ops);
					if (!response.ok) {
						alert("Login problem endpoint /login");
						return;
					}
					const body = await response.json();
					sessionStorage.setItem("token", body.token);
					sessionStorage.setItem("authenticated", true);
					actions.syncToken();
					return true;
				} catch (error) {
					console.log(error);
					return;
				}
			},
			signUp: async (username, password, email, avatar) => {
				const store = getStore();
				const actions = getActions();
				const ops = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: username,
						password: password,
						email: email,
						avatar: avatar,
					}),
				};
				try {
					const response = await fetch(`${store.api}/signup`, ops);
					if (!response.ok) {
						alert("Login problem endpoint /signup");
						return false;
					}
					console.log("Su usuario se ha creado correctamente");
					actions.logIn(username, password);
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			logOff: () => {
				sessionStorage.clear();
				setStore({ token: undefined, authenticated: false, currentUser: {} })
			},
			updateUser: async (username, password, email, phone) => {
				const store = getStore();
				const actions = getActions();
				const ops = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
					body: JSON.stringify({
						username: username,
						password: password,
						email: email,
						phone: phone,
					}),
				}
				try {
					const response = await fetch(`${store.apiUrl}/update-user`, ops);
					if (!response.ok) {
						alert("Update user has a problem with endpoint /update-user");
						return;
					}
					console.log(`Update user succefully! ${username}`);
					actions.syncToken();
					return true;
				} catch (error) {
					console.log(error)
					return;
				}
			},
			// ---------------- END USER ACTIONS -------------

		}
	};
};

export default getState;
