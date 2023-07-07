const axios = require('axios');
const jwt = require('jsonwebtoken');

/**
* Handler that will be called during the execution of a PostUserRegistration flow.
*
* @param {Event} event - Details about the context and user that has registered.
* @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
*/
exports.onExecutePostUserRegistration = async (event, api) => {
	try {
		// Assign newly created user to "User" role via the Auth0 managment API
		await assignUserRole(event, api);

		return true;
	} catch (err) {
		return false;
	}
};

async function fetchAllRoles(accessToken) {
	const config = {
		method: 'get',
		url: 'https://dev-kunalm8470.us.auth0.com/api/v2/roles',
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	};

	const response = await axios(config);

	return response.data;
}

async function assignUserRole(event, api) {
	const accessToken = await getManagementApiToken(api);

	const roles = await fetchAllRoles(accessToken);

	const userRole = roles.filter((role) => role.name === 'user');

	if (!userRole.length || !userRole[0] || !userRole[0].id) {
		throw new Error('Invalid role');
	}

	const userRoleId = userRole[0].id;

	return await assignNewUserToUserRole(event.user.user_id, userRoleId, accessToken);
};

function isTokenExpired(token) {
	try {
		const { exp } = jwt.decode(token);

		const expirationDatetimeInSeconds = exp * 1000;

		return Date.now() >= expirationDatetimeInSeconds;
	} catch {
		return true;
	}
}

async function getManagementApiToken(api) {
	let managementApiAccessToken = api.cache.get('managementApiAccessToken');

	const isAccessTokenExpired = isTokenExpired(managementApiAccessToken);

	if (managementApiAccessToken && isAccessTokenExpired) {
		managementApiAccessToken = await fetchManagementApiToken();

		api.cache.delete('managementApiAccessToken');

		api.cache.set('managementApiAccessToken', managementApiAccessToken);

		return managementApiAccessToken;
	} else if (managementApiAccessToken && !isAccessTokenExpired) {
		return managementApiAccessToken;
	} else {
		managementApiAccessToken = await fetchManagementApiToken();

		api.cache.delete('managementApiAccessToken');

		api.cache.set('managementApiAccessToken', managementApiAccessToken);

		return managementApiAccessToken;
	}
};

async function fetchManagementApiToken() {
	const config = {
		method: 'post',
		url: 'https://dev-kunalm8470.us.auth0.com/oauth/token',
		headers: {
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
			client_id: "",
			client_secret: "",
			audience: "https://dev-kunalm8470.us.auth0.com/api/v2/",
			grant_type: "client_credentials"
		})
	};

	const response = await axios(config);

	const { access_token } = response.data;

	return access_token;
}

async function assignNewUserToUserRole(userId, roleId, accessToken) {
	try {
		const config = {
			method: 'post',
			url: `https://dev-kunalm8470.us.auth0.com/api/v2/roles/${roleId}/users`,
			headers: {
				'Authorization': `Bearer ${accessToken}`
			},
			data: {
				users: [
					userId
				]
			}
		};

		return await axios(config);
	} catch (err) {
		throw err;
	}
};
