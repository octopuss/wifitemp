/**
 * @jsx React.DOM
 */

var React = require('react');

var Layout = React.createClass({
    render: function () {
        var generated = this.props.generated;
        var script = 'starter.main({now:new Date(),lastUpdated: \''+generated+'\'});';
        var js = 'js/'+this.props.js+'.js';
        return (
            <html>
                <head>
                    <meta charset="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>{this.props.title}</title>
                    <link href="css/main.css" rel="stylesheet" />
                </head>
                <body>
                     {this.props.children}
                    <script src="js/starter.js"></script>
                    <script src={js}></script>
                    <script dangerouslySetInnerHTML={{__html: script}} />
                </body>
            </html>
            );
    }
});
module.exports=Layout;