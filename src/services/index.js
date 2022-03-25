const url = 'http://localhost:5000/api';

export async function getAboutMe() {
    try {
        const data = await fetch(`${url}/about-me`);
        return data.json();
    } catch (err) {
        console.error(err);
    }
}

// Resume

export async function getResume() {
    try {
        const data = await fetch(`${url}/resume`);
        return data.json();
    } catch (err) {
        console.error(err);
    }
}

// Education

export async function editEducation(id, education) {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(`${url}/resume/education/edit/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`
            },
            body: JSON.stringify(education)
        });

        if (response.ok === false) {
            let error = (await response.json());
            if( error.error) {
                error = error.error;
            }
            
            throw new Error(error.message.toString());
        }

        try {
            const data = await response.json();
            return data;
        } catch (err){
            return response.json();
        }

    } catch (err) {
        throw err;
    }
}

export async function addEducation(resumeId, education) {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(`${url}/resume/education/${resumeId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`
            },
            body: JSON.stringify(education)
        });

        if (response.ok === false) {
            let error = (await response.json());
            if( error.error) {
                error = error.error;
            }
            
            throw new Error(error.message.toString());
        }

        try {
            const data = await response.json();
            return data;
        } catch (err){
            return response.json();
        }

    } catch (err) {
        throw err;
    }
}

export async function deleteEducation(resumeId, educationId) {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(`${url}/resume/${resumeId}/education/delete/${educationId}`, {
            method: 'delete',
            headers: {
                Authorization:  `Bearer ${token}`
            },
        });

        if (response.ok === false) {
            let error = (await response.json());
            if( error.error) {
                error = error.error;
            }
            
            throw new Error(error.message.toString());
        }

        try {
            const data = await response.json();
            return data;
        } catch (err){
            return response.json();
        }

    } catch (err) {
        throw err;
    }
}

// Courses

export async function editCourse(id, course) {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(`${url}/resume/courses/edit/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`
            },
            body: JSON.stringify(course)
        });

        if (response.ok === false) {
            let error = (await response.json());
            if( error.error) {
                error = error.error;
            }
            
            throw new Error(error.message.toString());
        }

        try {
            const data = await response.json();
            return data;
        } catch (err){
            return response.json();
        }

    } catch (err) {
        throw err;
    }
}

export async function addCourse(resumeId, course) {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(`${url}/resume/courses/${resumeId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`
            },
            body: JSON.stringify(course)
        });

        if (response.ok === false) {
            let error = (await response.json());
            if( error.error) {
                error = error.error;
            }
            
            throw new Error(error.message.toString());
        }

        try {
            const data = await response.json();
            return data;
        } catch (err){
            return response.json();
        }

    } catch (err) {
        throw err;
    }
}

export async function deleteCourse(resumeId, courseId) {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(`${url}/resume/${resumeId}/courses/delete/${courseId}`, {
            method: 'delete',
            headers: {
                Authorization:  `Bearer ${token}`
            },
        });

        if (response.ok === false) {
            let error = (await response.json());
            if( error.error) {
                error = error.error;
            }
            
            throw new Error(error.message.toString());
        }

        try {
            const data = await response.json();
            return data;
        } catch (err){
            return response.json();
        }

    } catch (err) {
        throw err;
    }
}

// Skills 

export async function addSkill(resumeId, skills) {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(`${url}/resume/skills/${resumeId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`
            },
            body: JSON.stringify(skills)
        });

        if (response.ok === false) {
            let error = (await response.json());
            if( error.error) {
                error = error.error;
            }
            
            throw new Error(error.message.toString());
        }

        try {
            const data = await response.json();
            return data;
        } catch (err){
            return response.json();
        }

    } catch (err) {
        throw err;
    }
}

//Portfolio

export async function getPortfolio() {
    try {
        const data = await fetch(`${url}/portfolio`);
        return data.json();
    } catch (err) {
        console.error(err);
    }
}

// Auth

export async function signIn(user) {
    try {
        const response = await fetch(`${url}/auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

        if (response.ok === false) {
            let error = (await response.json()).error;
            if( error.error) {
                error = error.error;
            }
            throw new Error(error.message.toString());
        }

        try {
            const data = await response.json();

            localStorage.setItem('access_token', data.token);
            localStorage.setItem('refresh_token', data.refreshToken);
            localStorage.setItem('username', data.username);

            return data.message;
        } catch (err){
            return response;
        }

    } catch (err) {
        throw err;
    }
}

export async function logout() {
    const token = localStorage.getItem('refresh_token');

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');

    try {
        const response = await fetch(`${url}/auth/revoke_token`, {
            method: 'post',
            headers: {
                'x-access-token':  token
            },
        });

        if (response.ok === false) {
            let error = (await response.json());
            if( error.error) {
                error = error.error;
            }
            
            throw new Error(error.toString());
        }

        try {
            const data = await response.json();
            return data.message;
        } catch (err){
            return response.json();
        }

    } catch (err) {
        throw err;
    }
}

export async function refreshToken() {
    const token = localStorage.getItem('refresh_token');

    try {
        const response = await fetch(`${url}/auth/refresh_token`, {
            method: 'post',
            headers: {
                'x-access-token':  token
            },
        });

        if (response.ok === false) {
            let error = (await response.json());
            if( error.error) {
                error = error.error;
            }
            
            throw new Error(error.error.toString());
        }

        try {
            const data = await response.json();

            localStorage.setItem('access_token', data.token);
            localStorage.setItem('refresh_token', data.refreshToken);
            localStorage.setItem('username', data.username);

            return data.message;
        } catch (err){
            return response.json();
        }

    } catch (err) {
        throw err;
    }
}