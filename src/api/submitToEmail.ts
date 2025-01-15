const basedUrl = window.location.origin;

export const submitToEmail = async (data: any) => {
    try {
        const response = await fetch(`${basedUrl}/api/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};