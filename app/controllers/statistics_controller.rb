class StatisticsController < ApplicationController
  def index
    respond_to do |format|
      format.html do
        @data = statistics_props_json
      end
    end
  end

  def os_dist
    render :json => host_count(:operatingsystem, :name => "os_dist")
  end

  def arch_dist
    render :json => host_count(:architecture, :name => "arch_dist")
  end

  def env_dist
    render :json => host_count(:environment, :name => "env_dist")
  end

  def puppetclass_dist
    klass_count = Puppetclass.authorized(:view_puppetclasses).map{|pc| {:label => pc.to_label, :data => pc.hosts_count}}.select{|pc| pc[:data] > 0}
    render :json => buildChartData("puppetclass", klass_count)
  end

  def memory_usage
    render :json => fact_usage('memory')
  end

  def swap_usage
    render :json => fact_usage('swap')
  end

  def cpu_count
    render :json => fact_count('processorcount', :name => 'cpu_count', :unit => Nn_('%s core', '%s cores'))
  end

  def model_count
    render :json => fact_count('manufacturer', :name => 'hardware')
  end
  private

  def host_count(type, params = {})
    data = Host.authorized(:view_hosts, Host).count_distribution(type)
    buildChartData(params[:name] || "#{type}_dist", data)
  end

  def fact_count(type, params = {})
    data   = FactValue.authorized(:view_facts).my_facts.count_each type, :unit => params[:unit]
    buildChartData(params[:name] || type, data)
  end

  def fact_usage(type, params = {})

    total = FactValue.authorized(:view_facts).my_facts.mem_average "#{type}size"
    free  = FactValue.authorized(:view_facts).my_facts.mem_average "#{type}free"

   buildChartData("#{type}_usage",
                          total == free ?
                              [{:label=>_("free #{type}"), :data=>free}] :
                              [{:label=>_("free #{type}"), :data=>free},{:label=>_("used #{type}"),:data=>(total-free).round(1)}])
  end

  def statistics_props_json
     [
         buildChartProps("operatingsystem_dist", _("OS Distribution"), "hosts?search=os_title=~VAL~", "os_dist"),
         buildChartProps("architecture_dist", _("Architecture Distribution"), "hosts?search=architecture=~VAL~", "arch_dist"),
         buildChartProps("environment_dist", _("Environments Distribution"), "hosts?search=environment=~VAL~", "env_dist"),
         buildChartProps("processorcount", _("Number of CPUs"), "hosts?search=facts.processorcount=~VAL1~", "cpu_count"),
         buildChartProps("hardware", _("Hardware"), "hosts?search=facts.manufacturer~~VAL~"),
         buildChartProps("puppetclass_dist", _("Class Distribution"), "hosts?search=class=~VAL~", "class_dist"),
         buildChartProps("memory_usage", _("Average memory usage")),
         buildChartProps("swap_usage", _("Average swap usage"))
    ].to_json
  end

  def buildChartProps (api, title, search_api= nil, name = nil)
    data ||= []
    {
        :'id' => name || api,
        :'title' => title,
        :'dataApi' => "/statistics/#{api}",
        :'searchApi' => search_api || ''
    }
  end

  def buildChartData (name, data)
    data ||= []
    {
        :'id' => name,
        :'data' => data.map{|element| [element[:label].to_s.humanize, element[:data]]}
    }
  end
end
