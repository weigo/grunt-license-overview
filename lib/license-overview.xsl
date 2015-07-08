<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" doctype-system="about: legacy-compat" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/licenses">
        <html>
            <head>
                <link rel="stylesheet" href="license-overview.css"/>
            </head>
            <body>
                <aside class="nav">
                    <nav>
                        <ul>
                            <xsl:apply-templates mode="nav"/>
                        </ul>
                    </nav>
                </aside>
                <section class="license-overview">
                    <xsl:apply-templates/>
                </section>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="license" mode="nav">
        <li>
            <xsl:element name="a">
                <xsl:attribute name="href">
                    <xsl:text>#</xsl:text><xsl:value-of select="@name"/>
                </xsl:attribute>
                <xsl:value-of select="@name"/>
            </xsl:element>
        </li>
    </xsl:template>

    <xsl:template match="license">
        <section>
            <h1>
                <xsl:element name="a">
                    <xsl:attribute name="id">
                        <xsl:value-of select="@name"/>
                    </xsl:attribute>
                    <xsl:value-of select="@name"/>
                </xsl:element>
            </h1>
            <table>
                <thead>
                    <th>Module</th>
                    <th>Version</th>
                    <th>Description</th>
                </thead>
                <tbody>
                    <xsl:apply-templates/>
                </tbody>
            </table>
        </section>
    </xsl:template>

    <xsl:template match="module">
        <tr>
            <td>
                <xsl:value-of select="@name"/>
            </td>
            <td>
                <xsl:value-of select="@version"/>
            </td>
            <td>
                <xsl:value-of select="./description/text()"/>
            </td>
        </tr>
    </xsl:template>
</xsl:stylesheet>
