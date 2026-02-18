import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, Mail, User, Shield } from "lucide-react";

export default async function SettingsPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    <span className="gradient-text">Configuración</span>
                </h1>
                <p className="text-muted mt-1">Gestiona tu perfil y preferencias</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Perfil
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar name={user.name} src={user.avatar} size="xl" />
                        <div>
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            <p className="text-sm text-muted">{user.email}</p>
                            <Badge
                                variant={user.role === "INSTRUCTOR" ? "default" : "secondary"}
                                className="mt-2"
                            >
                                <Shield className="h-3 w-3 mr-1" />
                                {user.role === "INSTRUCTOR" ? "Instructor" : "Estudiante"}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-xs text-muted">{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <Settings className="h-4 w-4 text-muted" />
                                <div>
                                    <p className="text-sm font-medium">Cuenta creada</p>
                                    <p className="text-xs text-muted">
                                        {new Date(user.createdAt).toLocaleDateString("es-ES", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-primary/20">
                <CardContent className="p-6">
                    <p className="text-sm text-muted text-center">
                        Este es un proyecto de portfolio. La edición de perfil está
                        simulada para demostrar la interfaz.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
