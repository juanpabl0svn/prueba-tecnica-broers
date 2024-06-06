export const URL = "http://localhost:3000";

export const POST = async (endpoint: string, body: any) => {
    try {

        const req = await fetch(`${URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const res = await req.json()

        if (!req.ok) throw new Error(res.error)

        return res

    } catch (error) {
        return { error }
    }
}